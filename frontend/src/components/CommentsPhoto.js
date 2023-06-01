import { useEffect, useState } from 'react'
import axios from "axios";
function CommentsPhoto() {
    const [id, setId] = useState(sessionStorage.getItem('image'))
    const [Image, setImage] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => console.log(text), [text]);

    useEffect(() => {
        getImage()
    }, [])

    function publishComment() {
        let inputText = document.getElementById("inputText");

    }
    async function publishComment(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/comments/", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                postedBy: "123",
                postedTo: id
            })
        });

        //     'message': String,
        // 'postedBy': {
        // 	type: Schema.Types.ObjectId,
        // 	ref: 'users'
        // },
        // 'postedTo': 

        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = "/";
        }
        else {
            console.log("NOT WORKING");
        }
    }


    async function getImage() {
        const res = await fetch("http://localhost:3001/photos/" + id, {
            method: "GET",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },

        });
        const data = await res.json();
        if (data._id !== undefined) {
            console.log(data);
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
            <form onSubmit={publishComment}>
                <input id="inputText" type='text' value={text} onChange={(e) => (setText(e.target.value))}></input>
                <button type='submit' onClick={publishComment} >Submit comment</button>
            </form>
        </div>
    );
}

export default CommentsPhoto;