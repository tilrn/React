import React, { useEffect, useState } from 'react';
function Photo(props) {
    const [id, setId] = useState(0)




    useEffect(() => console.log(id), [id]);

    async function photo(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/photos/" + props.photo._id, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },

        });
        const data = await res.json();
        if (data._id !== undefined) {
            console.log(data.name);
            sessionStorage.setItem("image", data._id);
            window.location.href = "/comments";

        }
        else {

        }
    }
    return (
        <div onClick={photo} className="card bg-dark text-dark mb-2" style={{ width: 300 }}>
            <img className="card-img" src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} id={props.photo.id} />
            <div className="card-img-overlay">
                <h5 className="card-title">{props.photo.name}</h5>
            </div>
        </div>
    );
}

export default Photo;