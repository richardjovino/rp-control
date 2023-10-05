import GlobalStyle from "../../styles/global";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Form from "../../components/Form";
import Grid from "../../components/Grid";
import axios from 'axios';

const Container = styled.div`
width:100%;
max-width:800px;
margin-top:20px;
display:flex;
flex-direction: column;
align-items: center;
gap:10px;
`

const Title = styled.h2``;

const Home = () =>{
    const [produtos, setProduto] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getProducts = async() =>{
        try{
            const res = await axios.get("http://34.204.93.4:8000/product");
            setProduto(res.data.sort((a,b) => (a.name > b.name ? 1 : -1)))
        }catch(error){
            toast.error(error)
        }
    }
    useEffect(()=>{
        getProducts()
    }, [setProduto])
    return (
<>
<Container>
<Title>PRODUTOS</Title>
<Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts}/>
<Grid produtos={produtos} setProduto={setProduto} setOnEdit={setOnEdit}/>
</Container>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_LEFT} />
        <GlobalStyle/>
</>

    )
}

export default Home