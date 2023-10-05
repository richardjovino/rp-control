import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from 'react-toastify'

const FormContainer = styled.form`
display:flex;
background-color: #fff;
padding:20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
display:flex;
flex-wrap: wrap;
align-items: flex-end;
gap:10px;
`

const InputArea = styled.div`
display:flex;
flex-direction:column;
`
const Input = styled.input`
width:120px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`
const Label = styled.label``
const Button = styled.button`
padding:10px;
cursor:pointer;
border-radius:5px;
border:none;
background-color:#2c73d2;
color:white;
height:42px;
`
const Form = ({getProducts, onEdit, setOnEdit}) =>{
    const ref = useRef();

    useEffect(()=>{
        if(onEdit){
            const produto = ref.current;

            produto.name.value = onEdit.name
            produto.stock.value = onEdit.stock
        }
    }, [onEdit])

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const produto = ref.current;
        if(
            !produto.name.value ||
            !produto.stock.value
        ){
            return toast.warn("Preencha todos os campos!")
        }

        if(onEdit){
            await axios.put(`http://34.204.93.4:8000/product/${onEdit.id}`, {
                name: produto.name.value,
                stock: Number(produto.stock.value)
            }).then(({data}) => toast.success(data)).catch(({data}) => toast.error(data))
        }else{
            await axios.post("http://34.204.93.4:8000/product",{
                name: produto.name.value,
                stock:Number(produto.stock.value)
            }).then(({data}) => toast.success(data)).catch(({data}) => toast.error(data))
        }

        produto.name.value = "";
        produto.stock.value = "";

        setOnEdit(null);
        getProducts();
    }
    return (
<>
<FormContainer ref={ref} onSubmit={handleSubmit}>
    <InputArea>
    <Label>Nome</Label>
    <Input name="name" />
    </InputArea>
    <InputArea>
    <Label>Estoque</Label>
    <Input name="stock"/>
    </InputArea>

    <Button type="submit">SALVAR</Button>
</FormContainer>
</>

    )
}

export default Form