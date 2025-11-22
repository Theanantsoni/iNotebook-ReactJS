import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //Add a note:

    const addNote = async (title, description, tag) => {

        console.log("Adding a new note");

        //API call code

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();
        console.log(json);

        // //Logic code.
        // const note = {
        //     "_id": "690bb0c3ce60876bd5e474791",
        //     "user": "690b9adfe65d94377a32503e",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2025-11-05T20:17:07.404Z",
        //     "__v": 0
        // };

        setNotes(notes.concat(json));
    }




    //Fetch all notes:

    const getNotes = async () => {

        console.log("Adding a new note");

        //API call code

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })

        const json = await response.json();
        console.log(json);
        setNotes(json)
    }

    //Edit a note:

    const editnote = async (id, title, description, tag) => {

        //API call code

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))

        //Edit client code
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }

    //Delete a note:

    //API Call

    const deleteNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = response.json();
        console.log(json)

        console.log("Deleting the note with id:" + id);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // const s1 = {
    //     "name" : "Harry",
    //     "class" : "5b" 
    // }

    // const[state, setState] = useState(s1)

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name":"Anant",
    //             "class":"10b"
    //         })
    //     },1000)
    // }

    return (
        <NoteContext.Provider value={{ notes, addNote, editnote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;