import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
    const { note, updatenote } = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    return (
        <div className='col md-3'>

            <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="far fa-trash-alt mx-2" onClick={()=> {deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> {updatenote(note);}}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
