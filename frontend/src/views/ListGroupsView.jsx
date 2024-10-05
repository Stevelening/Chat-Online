import { useState, useEffect,useContext, useRef } from 'react'
import '../App.css'
import { AppContext } from '../AppContext';
import Groups from '../components/Groups';
import MonBouton from '../components/MonBouton';


function ListGroupsView({selectItem, index, notif}) {
    const {token, refresh, setRefresh} = useContext(AppContext)
    const [groupsMember, setGroupsMember]=useState([])
    const [myGroups, setMyGroups]=useState([])
    const nameRef = useRef()
    const [newGroup, setNewGroup] = useState(false)

    useEffect(()=>{
        getGroupsMember()
        getMyGroups()
    },[newGroup, notif, refresh])
    
    async function getGroupsMember(){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/groupsmember',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get groups member : ', error);
        }))

        let data = await response.json()

        if(data.status){
            setGroupsMember(data.data)
        }
    }

    async function getMyGroups(){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/mygroups',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get my groups : ', error);
        }))

        let data = await response.json()

        let groups = []
        if(data){
            groups = data.data
        }
        setMyGroups(groups)
    }

    async function addGroup(){
        let name = nameRef.current.value 
        if(name){
            const response = await (await fetch("https://web-project.osc-fr1.scalingo.io/api/mygroups",
            {
                method: 'POST',
                headers: { 
                    'Content-type': 'application/json',
                    "x-access-token": token 
                },
                body: JSON.stringify({ name })
            })
            .catch(error => {
                console.error('An error occured during group creation : ', error);
            }))

            if(response){
                // le groupe a été créé avec succes
                nameRef.current.value = "" // on vide le champ de saisie
                setNewGroup(!newGroup) // on notifie le composant 
                setRefresh(!refresh)
            }
        }
    }

    function selectItem1(key, name, type){
        selectItem(key, name, type)
    }

    return (
        <fieldset style={{width: "40%", padding:"0"}}>
            <legend style={{marginLeft:"20px"}}>Mes groupes</legend>
            <h3>Ceux dont je suis membre</h3>
            <Groups liste={groupsMember} selectedItem={selectItem1} type={"member"} index={index}/>
            <hr />
            <h3>Ceux que j'administre</h3>
            <Groups liste={myGroups} selectedItem={selectItem1} type={"admin"} index={index}/>
            <div style={{padding:"0 10px"}}>
                <input type="text" ref={nameRef} style={{width:"70%"}} placeholder="Entrer le nom du nouveau groupe"/>
            </div>
            <div style={{padding:"10px"}}>
                <MonBouton
                    clickFonction={addGroup}
                    title="Créer"
                />
            </div>
        </fieldset>
    )
}

export default ListGroupsView
