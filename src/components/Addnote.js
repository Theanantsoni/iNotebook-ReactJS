import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useState } from "react"

const Addnote = (props) => {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNotes] = useState({ title: "", description: "", tag: "default" });

    const handleclick = (e) => {
        e.preventDefault(); //Not reload the page
        addNote(note.title, note.description, note.tag);
        setNotes({title: "", description: "", tag: ""});
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <h1>Add a note</h1> 
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title :</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description :</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag :</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                 
                <button type="submit" className="btn btn-primary" onClick={handleclick}>Add a note</button>
            </form>
        </div>
    )
}

export default Addnote
