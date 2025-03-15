import { useState } from "react";
import useAuth from "../../../Hooks/Auth/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../../Pages/Loading/Loading";

const EventFeed = ({ joinEvent, eventFeedData, userData }) => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // get all post from postCode
    const [getPostCode, setGetPostCode] = useState('');

    // event SeeMore States
    const [eventSeeMore, setEventSeeMore] = useState(false);
    const [eventCode, setEventCode] = useState('');
    const handleEventSeeMore = (event) => {
        if (event === eventCode) {
            setEventSeeMore(!eventSeeMore);
        }
        setEventCode(event);
    };


    // post SeeMore States
    const [postSeeMore, setPostSeeMore] = useState(false);
    const [postCode, setPostCode] = useState('');

    const handlePostSeeMore = (post) => {
        setPostSeeMore(!postSeeMore);
        setPostCode(post);
    };



    // commentBox open
    const [comment, setComment] = useState(false);
    const [commentCode, setCommentCode] = useState('');

    const handleCommentOpen = (post) => {
        setComment(!comment);
        setCommentCode(post);
        setGetPostCode(post);
    };


    // get all comments
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['allComments', getPostCode],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/comments/${getPostCode}`);
            return data;
        }
    });



    // add comments to the dataBase
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (commentData) => {
            const { data } = await axiosSecure.post('/comments', commentData);
            return data;
        },
        onSuccess: () => {
            toast.success('Comment Posted !');
            refetch();
        }
    });


    // commentBoxData
    const handleComment = async (e, postData) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const commentData = {
            postCode: postData?.postCode,
            postCreatedBy: postData?.createdBy,
            commentorImage: userData?.image || user?.photoURL,
            commentetorName: userData?.name || user?.displayName,
            commentetorEmail: user?.email,
            commentetedDate: Date.now(),
            comment,
        };
        await mutateAsync(commentData);
        form.reset();

    };

    if (loading || isLoading || isPending) return <Loading />;

    return (
        <div className="min-h-screen py-16 px-10">


            {
                eventFeedData.map(got => (

                    <div key={got?._id}>


                        {/* only for Events */}
                        {
                            got?.postType === 'event' && <div>
                                <div className="w-full flex flex-col xl:flex-row mb-12 items-center">
                                    <img src={got?.imageURL} alt="" className="h-[200px] md-h-[400px] w-full xl:h-[300px] xl:w-[400px] object-cover" />
                                    <div className="flex-1 flex flex-col justify-between p-2 md:p-5 space-y-2">
                                        <p className={`font-merriway ${got?.organization === 'not exist' && 'hidden'}`}>{got?.organization}</p>
                                        <p className="font-lexend text-[clamp(20px,4vw,30px)]">{got?.title}</p>
                                        <p className={`text-[clamp(8px,3vw,15px)] ${eventSeeMore && eventCode === got?.eventCode ? 'hidden' : ''} font-raleway`}>{got?.description.slice(0, 150)} ...</p>
                                        <p className={`text-[clamp(8px,3vw,15px)] ${eventSeeMore && eventCode === got?.eventCode ? 'block' : 'hidden'}`}>{got?.description}</p>
                                        <p className={`font-light text-[clamp(8px,3vw,15px)] `}><span className="font-medium">Date:</span> {got?.date}</p>
                                        <p className={`font-light text-[clamp(8px,3vw,15px)] `}><span className="font-medium">Location:</span> {got?.location}</p>
                                        <p className={`font-light text-[clamp(8px,3vw,15px)] `}><span className="font-medium">Time:</span> {got?.time}</p>


                                        {/* see More btn */}
                                        <button
                                            onClick={() => { handleEventSeeMore(got?.eventCode); }}
                                            className={`text-left text-blue-600
                                                ${got?.description.length > 150 ? '' : 'hidden'} 
                                                ${eventSeeMore && eventCode === got?.eventCode ? 'hidden' : 'block'}`}
                                        >See more</button>

                                        {/* see Less button */}
                                        <button
                                            onClick={() => setEventSeeMore(!eventSeeMore)}
                                            className={`text-left text-blue-600
                                        ${eventSeeMore && eventCode === got?.eventCode ? 'block' : 'hidden'}`}>
                                            See less
                                        </button>


                                        {/* join Event Button */}
                                        <button onClick={() => joinEvent(got)} className="px-4 py-2 border border-black">Join Event</button>
                                    </div>
                                </div>
                            </div>
                        }


                        {/* Only for Posts */}

                        {
                            got?.postType === 'post' && <div>
                                <div className={`
                                
                                    ${comment && commentCode === got?.postCode ? 'h-[400px] md:h-[500px] xl:max-h-[650px] rounded-xl p-5 shadow-xl overflow-x-hidden overflow-y-scroll mb-10' : ' mb-12 items-center w-full flex flex-col xl:flex-row'}

                                    `}>

                                    <img src={got?.imageURL} alt=""
                                        className={`${comment && commentCode === got?.postCode ? 'h-[220px] md:h-[400px] xl:h-[400px] w-full object-cover' : 'h-[220px] md-h-[400px] xl:h-[300px] xl:w-[400px] w-full object-cover'}  `} />

                                    <div className="flex-1 flex flex-col justify-between p-2 md:p-5 space-y-2">
                                        <p className={`font-merriway ${got?.organization === 'not exist' && 'hidden'}`}>{got?.organization}</p>
                                        <p className={`font-lexend text-[clamp(15px,3vw,20px)] text-blue-600 
                                             ${got?.level === 'Medium' && 'text-green-500'}
                                              ${got?.level === 'Urgent' && 'text-red-500'}
                                            `}>{got?.level}</p>
                                        <p className="font-lexend text-[clamp(20px,4vw,30px)]">{got?.title}</p>
                                        <p className={`text-[clamp(8px,3vw,15px)] ${postSeeMore && postCode === got?.postCode ? 'hidden' : 'block'} font-raleway`}>{got?.description.slice(0, 150)} ...</p>
                                        <p className={`text-[clamp(8px,3vw,15px)] ${postSeeMore && postCode === got?.postCode ? 'block' : 'hidden'}`}>{got?.description}</p>
                                        <p className={`font-light text-[clamp(8px,3vw,15px)] hidden ${got?.date && 'block'}`}><span className="font-medium">Location:</span> {got?.location}</p>
                                        <p className={`font-light text-[clamp(8px,3vw,15px)] hidden ${got?.location && 'block'}`}><span className="font-medium">Time:</span> {got?.time}</p>
                                        <p className={`font-light text-[clamp(8px,3vw,15px)] hidden ${got?.time && 'block'}`}><span className="font-medium">Date:</span> {got?.date}</p>

                                        {/* see More btn */}
                                        <button
                                            onClick={() => handlePostSeeMore(got?.postCode)}
                                            className={`text-left text-blue-600
                                                ${got?.description.length > 150 ? '' : 'hidden'} 
                                                ${postSeeMore && postCode === got?.postCode ? 'hidden' : 'block'}`}
                                        >See more</button>

                                        {/* see Less button */}
                                        <button
                                            onClick={() => setPostSeeMore(!postSeeMore)}
                                            className={`text-left text-blue-600
                                        ${postSeeMore && postCode === got?.postCode ? 'block' : 'hidden'}`}>
                                            See less
                                        </button>



                                        {/* comment box and comments */}
                                        <div className={`${comment && commentCode === got?.postCode ? 'block' : 'hidden'} py-5`}>


                                            {/* comment input form */}
                                            <form onSubmit={(e) => handleComment(e, got)}>
                                                <div className="flex flex-col">
                                                    <label htmlFor="comment" className="text-[clamp(15px,3vw,20px)]">Add Comment</label>
                                                    <input type="text" name="comment" className="outline-none mb-5 bg-[#DFDFF0] border-b border-black" />
                                                </div>
                                                <button className="px-3 w-[150px] py-2 border border-black text-xs">Submit</button>
                                            </form>


                                            {/* all comments */}
                                            {
                                                data.map((comment, idx) => (
                                                    <div key={idx} className="font-raleway text-[clamp(10px,3vw,16px)] my-5 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <img src={comment?.commentorImage} alt="no image found" className="size-10 rounded-full" />
                                                            <p className="font-lexend">{comment?.commentetorName}</p>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <p>{comment?.comment}</p>
                                                            <p className="font-sans md:hidden text-[clamp(8px,2vw,15px)]">
                                                                {new Date(comment?.commentetedDate).toLocaleString("en-US", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                })}
                                                            </p>
                                                            <p className="font-sans hidden md:block text-[clamp(8px,3vw,15px)]">
                                                                {new Date(comment?.commentetedDate).toLocaleString("en-US", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            }





                                        </div>

                                        {/* addComment Button */}
                                        <button onClick={() => handleCommentOpen(got?.postCode)}
                                            className={`${comment && commentCode === got?.postCode ? 'hidden' : ''} 
                                        px-4 py-2 border border-black`}>
                                            Add a Comment</button>

                                        {/*Comment close Button */}
                                        <button onClick={() => handleCommentOpen(got?.postCode)}
                                            className={`${comment && commentCode === got?.postCode ? '' : 'hidden'}
                                        px-4 py-2 border border-black`}>
                                            Close</button>


                                    </div>
                                </div>
                            </div>
                        }



                    </div>

                ))
            }

        </div >
    );
};

export default EventFeed;