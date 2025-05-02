import { useEffect, useState } from "react";
import { getAllActivities } from "../../../api/landing-page/activityApi";
import { Dialog } from "@headlessui/react";

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        getAllActivities().then(setActivities).catch(console.error);
    }, []);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <section id="activity" className="py-20 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">Kegiatan Koperasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {[...Array(3)].map((_, index) => {
                const activity = activities[index];
                return (
                <div
                    key={activity?._id || index}
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
                    onClick={() => activity && setSelectedActivity(activity)}
                >
                    {activity ? (
                    <>
                        <img
                        src={activity.image ||``}
                        alt="Activity"
                        className="w-full h-72 object-cover"
                        />
                        <div className="p-4">
                        <h3 className="font-semibold text-green-400 text-lg">{activity.title}</h3>
                        <p className="text-sm text-gray-300 mt-2">{truncateText(activity.description, 100)}</p>
                        <button
                            className="mt-4 text-green-400 hover:text-green-300 font-semibold"
                            onClick={() => setSelectedActivity(activity)}
                        >
                            Lihat Detail
                        </button>
                        </div>
                    </>
                    ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                        <p className="text-lg font-semibold">Belum ada kegiatan</p>
                        <p className="text-sm mt-2">Silakan cek kembali nanti.</p>
                    </div>
                    )}
                </div>
                );
            })}
            </div>

            {selectedActivity && (
                <Dialog open={true} onClose={() => setSelectedActivity(null)} className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
                    <Dialog.Panel className="bg-gray-900 text-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto z-50">
                        <button 
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-3xl font-bold"
                            onClick={() => setSelectedActivity(null)}
                        >
                            &times;
                        </button>
                        <img 
                            src={selectedActivity.image || ``} 
                            alt="Activity" 
                            className="w-full h-96 object-cover rounded-md"
                        />
                        <h3 className="text-green-400 text-2xl font-bold mt-4">{selectedActivity.title}</h3>
                        <p className="text-gray-300 mt-2">{selectedActivity.description}</p>
                        <p className="text-sm text-gray-500 mt-4">{selectedActivity.location} - {new Date(selectedActivity.date).toLocaleDateString()}</p>
                    </Dialog.Panel>
                </Dialog>            
            )}
        </section>
    );
};

export default Activity;
