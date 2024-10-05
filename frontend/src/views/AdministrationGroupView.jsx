import React from 'react'
import { useEffect, useState, useContext, useRef } from 'react'
import MonBouton from '../components/MonBouton'
import { AppContext } from '../AppContext'
import Members from '../components/Members'

function AdministrationGroupView({ gid, name, notify, invalid }) {
    const {token, refresh, setRefresh} = useContext(AppContext)
    const [users, setUsers] = useState([])
    const selectedUserRef = useRef()
    const [edit, setEdit] = useState(false)
    const [members, setMembers] = useState([])

    useEffect(()=>{
        getUsers()
        getMembers()
    },[edit, name, refresh])

    useEffect(()=>{
        notify() // notify its parent that a group was deleted
    }, [edit])

    async function getUsers(){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/users',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get all users : ', error);
        }))

        let data = await response.json()
        if(data){
            setUsers(data.data)
        }
    }

    async function addUserToGroup(){
        let url = 'https://web-project.osc-fr1.scalingo.io/api/mygroups/'+gid+"/"+getUserId()
        const response = await (await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during adding a user to a group : ', error);
        }))

        let data = await response.json()
        if(data.status){
            setEdit(!edit)
            setRefresh(!refresh)
        }
    }

    function getUserId(){
        for(let user of users){
            if(user.email == selectedUserRef.current.value){
                return user.id
            }
        }
        return -1; // this email is not in the list
    }

    async function getMembers(){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/mygroups/'+gid,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get group members : ', error);
        }))

        let data = await response.json()
        if(data.status){
            setMembers(data.data)
        }
        else{
            invalid()
        }
    }

    async function deleteUserFromGroup(id){
        let url = 'https://web-project.osc-fr1.scalingo.io/api/mygroups/'+gid+"/"+id
        const response = await (await fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during deleting a user from a group : ', error);
        }))

        let data = await response.json()
        if(data.status){
            setEdit(!edit)
            setRefresh(!refresh)
        }
    }

    return (
        <fieldset style={{ width: "40%", padding: "0" }}>
            <legend style={{ marginLeft: "20px" }}>Administration <label style={{fontWeight:"bold"}}>{'"' + name + '"'}</label></legend>
            <p>Ajouter un membre</p>
            <div>
                <select style={{marginRight:"20px"}} ref={selectedUserRef}>
                    {users.map(user => (
                        <option key={user.id} value={user.email}>{user.email}</option>
                    ))}
                </select>
                <MonBouton
                    clickFonction={addUserToGroup}
                    title="Ajouter"
                />
            </div>
            <hr />
            <h3>Liste des membres</h3>
            <hr />
            <Members liste={members} deleteUser={deleteUserFromGroup}/>
        </fieldset>
    )
}

export default AdministrationGroupView