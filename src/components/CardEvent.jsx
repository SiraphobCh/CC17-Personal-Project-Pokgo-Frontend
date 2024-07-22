import moment from "moment-timezone";

export default function CardEvent({ eventUserData, authUser, deleteEvent = null, allEventsData }) {
  console.log(allEventsData);

  const bossSpawn = moment.tz(eventUserData.location.spawnTime[0].bossSpawn, "Asia/Bangkok");
  const bossTerminate = moment.tz(
    eventUserData.location.spawnTime[0].bossTerminate,
    "Asia/Bangkok"
  );

  const handleDelete = () => {
    deleteEvent(eventUserData.id);
  };

  return (
    <div className="text-white py-4 px-2 grid gap-4">
      <div className="bg-gray-700 p-4 rounded-lg max-w-2xl max-h-full shadow-lg flex flex-col gap-2 px-5 relative">
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          DELETE
        </button>

        <div className="text-xl">{eventUserData.eventName}</div>
        <div className="text-sm">Host by {authUser.characterName}</div>
        {eventUserData && (
          <div className="text-sm">
            Join by {eventUserData.relationships.map((item) => item.user.characterName).join(", ")}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-sm">
            <div>{bossSpawn.format("DD-MM-YYYY")}</div>
            <div>
              {bossSpawn.format("HH:mm")} - {bossTerminate.format("HH:mm")}
            </div>
          </div>
          <div className="text-sm">📍{eventUserData.location.name}</div>
        </div>
      </div>
    </div>
  );
}
