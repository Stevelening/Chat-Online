import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../AppContext'
import ChangeRole from '../components/ChangeRole'
import DeleteUser from '../components/DeleteUser'
import DeleteGroup from '../components/DeleteGroup'

function AdministratorView(){
    const {token, refresh, setRefresh} = useContext(AppContext)
    const [users, setUsers] = useState([])
    const [groups, setGroups] = useState([])
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        getUsers()
        getGroups()
    }, [edit, refresh])

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

    async function getGroups(){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/allgroups',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get all groups : ', error);
        }))

        let data = await response.json()
        if(data){
            setGroups(data.data)
        }
    }

    async function updateUser(id, isAdmin){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/users/'+id,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            },
            body: JSON.stringify({ isAdmin })
        })
        .catch(error => {
            console.error('An error occured during edit user role : ', error);
        }))

        let data = await response.json()
        if(data.status){
            console.log("edit successfully")
            setEdit(!edit)
            setRefresh(!refresh)
        }
    }

    async function deleteUser(id){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/users/'+id,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during deleting user : ', error);
        }))

        let data = await response.json()
        if(data){
            // utilisateur supprimé
            setEdit(!edit)
            setRefresh(!refresh)
        }
    }

    async function deleteGroup(id){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/mygroups/'+id,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during deleting group : ', error);
        }))

        let data = await response.json()
        if(data){
            // groupe supprimé
            setEdit(!edit)
            setRefresh(!refresh)
        }
    }
        
    return (
        <div style={{width:"80%", marginTop:"10px", border: "1px solid #213547"}}>
            <div style={{backgroundColor:"#f0f0f0", borderBottom:"1px solid #213547", textAlign:"center", padding:"10px 0"}}>
                {"~ Adminstration de l'Appli ~"}
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <ChangeRole users={users} updateUserRole={updateUser}/>
                <DeleteUser users={users} deleteUser={deleteUser}/>
                <DeleteGroup groups={groups} deleteGroup={deleteGroup}/>
            </div>
        </div>
    )
}

export default AdministratorView