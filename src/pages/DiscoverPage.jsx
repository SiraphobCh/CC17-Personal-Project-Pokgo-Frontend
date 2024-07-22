import DiscoverCardEvent from "../components/DiscoverCardEvent";
import useAuth from "../hooks/useAuth";

export default function DiscoverPage() {
  const { allEvents, authUser, joinEvent, cancelEvent } = useAuth();
  console.log(allEvents);
  return (
    <div className="bg-gray-800 p-4 rounded-lg max-w-2xl mx-auto shadow-lg mt-14">
      <div className="text-white flex justify-between text-center items-center px-2 mt-1">
        <div className="text-3xl ">What happening in PokGO</div>
      </div>
      {allEvents &&
        allEvents.map((item) => (
          <DiscoverCardEvent
            key={item.id}
            allEventsData={item}
            authUser={authUser}
            joinEvent={joinEvent}
            cancelEvent={cancelEvent}
          />
        ))}
    </div>
  );
}
