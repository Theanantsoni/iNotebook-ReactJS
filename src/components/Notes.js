// import React from "react";
import { useContext, useEffect, useRef, useState } from "react"
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

    const {showAlert} = props;

    const context = useContext(NoteContext);
    const { notes, getNotes, editnote } = context;

    const navigate = useNavigate()


    useEffect(() => {

        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
             navigate("/login");
        }
    }, [])

    const updatenote = (currentNote) => {
        ref.current.click();
        setNotes({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
        
    }

    const ref = useRef(null)
    const refclose = useRef(null)

    const handleclick = (e) => {
        console.log("Updating the notes", note);
        editnote(note.id, note.etitle, note.edescription, note.etag);
       refclose.current.click();
       props.showAlert("Updated Successfully", "success");
    }

    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Addnote showAlert={props.showAlert} />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">


                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title :</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description :</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag :</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleclick} className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h1>Your Notes</h1>
                
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note} />
                })}

            </div>
        </>
    )
}

export default Notes
