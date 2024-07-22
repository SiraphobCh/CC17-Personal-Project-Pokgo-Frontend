import CardEvent from "../components/CardEvent";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { eventUser, authUser, deleteEvent } = useAuth();
  return (
    <div className="bg-gray-800 p-4 rounded-lg max-w-2xl mx-auto shadow-lg mt-14">
      <div className="text-white flex justify-between text-center items-center px-2 mt-1">
        <div className="text-3xl ">My Event</div>
        <div className="text-lg">Upcoming</div>
      </div>
      {eventUser &&
        eventUser.map((item) => (
          <CardEvent
            key={item.id}
            eventUserData={item}
            authUser={authUser}
            deleteEvent={deleteEvent}
          />
        ))}
    </div>
  );
}
