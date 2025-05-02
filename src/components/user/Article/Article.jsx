import { useEffect, useState } from "react";
import { getAllArticles } from "../../../api/landing-page/articleApi";
import { Dialog } from "@headlessui/react";

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        getAllArticles().then(setArticles).catch(console.error);
    }, []);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <section id="article" className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">Artikel Terbaru</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {[...Array(3)].map((_, index) => {
                const article = articles[index];
                return (
                <div
                    key={article?._id || index}
                    className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
                    onClick={() => article && setSelectedArticle(article)}
                >
                    {article ? (
                    <>
                        <img
                        src={article.image ||``}
                        alt="Article"
                        className="w-full h-72 object-cover"
                        />
                        <div className="p-4">
                        <h3 className="font-semibold text-green-400 text-lg">{article.title}</h3>
                        <p className="text-sm text-gray-300 mt-2">{truncateText(article.content, 100)}</p>
                        <button
                            className="mt-4 text-green-400 hover:text-green-300 font-semibold"
                            onClick={() => setSelectedArticle(article)}
                        >
                            Baca Selengkapnya
                        </button>
                        </div>
                    </>
                    ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                        <p className="text-lg font-semibold">Belum ada artikel</p>
                        <p className="text-sm mt-2">Silakan cek kembali nanti.</p>
                    </div>
                    )}
                </div>
                );
            })}
            </div>

            {selectedArticle && (
                <Dialog open={true} onClose={() => setSelectedArticle(null)} className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
                    <Dialog.Panel className="bg-gray-900 text-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto z-50">
                        <button 
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-3xl font-bold"
                            onClick={() => setSelectedArticle(null)}
                        >
                            &times;
                        </button>
                        <img 
                            src={selectedArticle.image || ``} 
                            alt="Article" 
                            className="w-full h-96 object-cover rounded-md"
                        />
                        <h3 className="text-green-400 text-2xl font-bold mt-4">{selectedArticle.title}</h3>
                        <p className="text-gray-300 mt-2">{selectedArticle.content}</p>
                        <p className="text-sm text-gray-500 mt-4">By {selectedArticle.author} - {new Date(selectedArticle.date).toLocaleDateString()}</p>
                    </Dialog.Panel>
                </Dialog>
            )}
        </section>
    );
};

export default Article;

