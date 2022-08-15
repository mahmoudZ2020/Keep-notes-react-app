import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from "axios"

import $ from "jquery";

function Home() {

    let token = localStorage.getItem("token")
    let baseUrl = "https://route-egypt-api.herokuapp.com/"

    let decoded = jwt_decode(token)
    let userID = decoded._id

    const [notes, setNotes] = useState([])

    console.log(userID);

    async function getAllNotes() {
        let { data } = await axios.get(baseUrl + "getUserNotes", {
            headers: {
                token,
                userID
            }
        })

        if (data.message == "success") {
            setNotes(data.Notes)
        } else {
            setNotes([])
        }

        console.log(data)
    }

    useEffect(() => {
        getAllNotes()
    }, [])

    const [note, setNote] = useState({ title: "", desc: "", userID, token })

    function getNote({ target }) {
        setNote({ ...note, [target.name]: target.value })
    }

    async function addNote(e) {
        e.preventDefault()
        let { data } = await axios.post(baseUrl + "addNote", note)
        console.log(data);

        if (data.message == "success") {
            getAllNotes()
            // $("#exampleModal").fadeOut(()=>{
            //     $(".modal-backdrop").fadeOut()
            // })
        }
    }


    async function deleteNote(NoteID) {
        let { data } = await axios.delete(baseUrl + "deleteNote", {
            data: {
                NoteID,
                token
            }
        })

        getAllNotes()
    }




    return (
        <>
            <div className="container my-5">
                <div className="col-md-12 text-end">
                    <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={addNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>



            {/* <!-- ==========================Notes=============================== --> */}

            <div className="container">
                <div className="row">

                    {notes.map((note, index) => {
                        return (
                            <div key={index} className="col-md-4 my-4">
                                <div className="note p-4">
                                    <h3 className="float-start">{note.title}</h3>
                                    <a ><i className="fas fa-edit float-end edit"></i></a>
                                    <a onClick={() => { deleteNote(note._id) }} > <i className="fas fa-trash-alt float-end px-3 del"></i></a>
                                    <span className="clearfix"></span>
                                    <p>{note.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Home
