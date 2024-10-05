import { useState, useEffect,useContext, useRef } from 'react'
import '../App.css'
import { AppContext } from '../AppContext';
import MyHeader from '../components/MyHeader';
import ListGroupsView from './ListGroupsView';
import AdministrationGroupView from './AdministrationGroupView';
import MessagesView from './MessagesView';
import UpdatePassword from '../components/UpdatePassword';
import AdministratorView from './AdministratorView';

function Accueil({email}) {
    const {token} = useContext(AppContext)
    const [login, setLogin] = useState("")
    const [selected, setSelected] = useState(false)
    const [gId, setGId] = useState()
    const [gName, setGName] = useState("")
    const [gType, setGType] = useState("")
    const [index, setIndex] = useState("")
    const [notif, setNotif] = useState(false)
    const [userRole, setUserRole] = useState(0)

    useEffect(()=>{
        getUserName()
        getUserType()
    },[])
    
    async function getUserName() {
        const response = await (await fetch("https://web-project.osc-fr1.scalingo.io/api/users",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    "x-access-token": token
                }
            })
            .catch(error => {
                console.error('An error occured during get users : ', error);
            }))

        let responseData = await response.json()

        let userName = "";

        if (responseData) {
            // parcourir response.data et recuperer le bon username
            for (let resp of responseData.data) {
                if (resp.email == email) {
                    userName = resp.name
                }
            }
        }
        setLogin(userName)
    }

    async function getUserType() {
        const response = await (await fetch("https://web-project.osc-fr1.scalingo.io/api/admin",
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    "x-access-token": token
                }
            })
            .catch(error => {
                console.error('An error occured during get admin : ', error);
            }))

        let data = await response.json()
        if(data.status){
            setUserRole(1)
        }
    }

    function getSelectedItem(id, name, type){
        setSelected(true)
        setGId(id)
        setGName(name)
        setGType(type)
        setIndex(id+":"+type) // index of selected group
    }

    function notify(){ // notify this component if we delete a group
        setNotif(!notif)
    }

    function invalid(){
        setSelected(false)
    }

    return (
        <div style={{height:"390px"}}>
            <div style={{textAlign:"right", width: selected ? "80%": "40%"}}>
                <MyHeader title={((userRole == 0) ? "Utilisateur" : "Administrateur") + " | " + email + " | [Se déconnecter]"}/>
            </div>
            <div>
                <UpdatePassword/>
            </div>
            <div style={{display:"flex"}}>
                <ListGroupsView selectItem={getSelectedItem} index={index} notif={notif}/>
                {selected && 
                    ((gType == "admin") ? 
                    <AdministrationGroupView gid={gId} name={gName} notify={notify} invalid={invalid}/> :
                    <MessagesView gid={gId} name={gName} login={login} invalid={invalid}/>)
                }
            </div>
            <div>
                {(userRole == 1) && <AdministratorView/>}
            </div>
        </div> 
    )
}

export default Accueil
