import { useEffect, useState } from 'react'
import axios from "axios";
function CommentsPhoto() {
    const [id, setId] = useState(sessionStorage.getItem('image'))
    const [Image, setImage] = useState([]);
    const [Comments, setComments] = useState([]);
    const [Users, setUsers] = useState([]);

    const [comment, setComment] = useState("");   
    const [refresh, setRefresh] = useState("");
    const [text, setText] = useState("");

    //useEffect(() => console.log(text), [text]);

    useEffect(() => {
        getImage()
    }, [])

   //function publishComment() {
   //    let inputText = document.getElementById("inputText");

   //}

   async function handleComment(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            messagee: text,
            postedTo: id
        }),
    });

    const data = await res.json();
    setRefresh(refresh + "1");

   //console.log(data)
    
}

useEffect(
    function () {
        const getComments = async function () {
            const res = await fetch(
                "http://localhost:3001/comments/photo/" +
                    id
            );
            const data = await res.json();
            setComments(data);
        };
        getComments();
    },

    [refresh]



);




   


    async function getImage() {
        const res = await fetch("http://localhost:3001/photos/" + id, {
            method: "GET",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },

        });
        const data = await res.json();
        if (data._id !== undefined) {
            //console.log(data);
            setImage(data);
        } else {

        }
    }
    return (
        <div id="test">
            {
                <div className="card bg-dark text-dark mb-2" style={{ width: 300 }}>
                    <img className="card-img" src={"http://localhost:3001/" + Image.path} alt={Image.name} id={Image._id} />
                </div>
            }
            <form onSubmit={handleComment}>
                <input id="inputText" type='text' name='text' value={text} onChange={(e) => (setText(e.target.value))}></input>
                <button type='submit'  >Submit comment</button>
            </form>

            <div>
                {Comments &&
                    Comments.map((comment) => (
                        <div key={comment._id}>
                            {comment.postedBy.username}: {comment.message}
                        </div>
                    ))}
            </div>


        </div>
    );
}

export default CommentsPhoto;