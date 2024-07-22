import moment from "moment-timezone";

export default function CardEvent({ allEventsData, authUser, joinEvent, cancelEvent }) {
  // Check if the authUser is the host of the event
  if (authUser.id === allEventsData.hostId) {
    return null; // Do not display the event
  }

  const bossSpawn = moment.tz(allEventsData.location.spawnTime[0].bossSpawn, "Asia/Bangkok");
  const bossTerminate = moment.tz(
    allEventsData.location.spawnTime[0].bossTerminate,
    "Asia/Bangkok"
  );

  // Find the relationship status of the authenticated user by playerId
  const userRelationship = allEventsData.relationships.find(
    (relationship) => relationship.playerId === authUser.id
  );

  const eventStatus = userRelationship ? userRelationship.status : "CANCELED";

  const handleButtonClick = () => {
    if (eventStatus === "JOINED") {
      cancelEvent(allEventsData.id);
    } else {
      joinEvent(allEventsData.id);
    }
  };

  // Filter relationships to exclude users with "CANCELED" status
  const activeParticipants = allEventsData.relationships.filter(
    (relationship) => relationship.status !== "CANCELED"
  );

  return (
    <div className="text-white py-4 px-2 grid gap-4">
      <div className="bg-gray-700 p-4 rounded-lg max-w-2xl max-h-full shadow-lg flex flex-col gap-2 px-5 relative">
        <button
          className={`absolute top-4 right-4 ${
            eventStatus === "JOINED"
              ? "text-orange-500 hover:text-orange-700"
              : "text-green-500 hover:text-green-700"
          }`}
          onClick={handleButtonClick}
        >
          {eventStatus === "JOINED" ? "CANCEL" : "JOIN"}
        </button>

        <div className="text-xl">{allEventsData.eventName}</div>
        <div className="text-sm">Host by {allEventsData.user.characterName}</div>

        {activeParticipants.length > 0 && (
          <div className="text-sm">
            Join by {activeParticipants.map((item) => item.user.characterName).join(", ")}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex flex-col text-sm">
            <div>{bossSpawn.format("DD-MM-YYYY")}</div>
            <div>
              {bossSpawn.format("HH:mm")} - {bossTerminate.format("HH:mm")}
            </div>
          </div>
          <div className="text-sm">📍 {allEventsData.location.name}</div>
        </div>
      </div>
    </div>
  );
}
