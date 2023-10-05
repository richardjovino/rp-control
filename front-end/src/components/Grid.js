import React from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify";

const Table = styled.table`
width:100%;
background-color: #fff;
padding:20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-width:800px;
margin:20px auto;
word-break: break-all;
`
const Thead = styled.thead``;

const Tr = styled.tr``
const Th = styled.th`
text-align:start;
border-bottom:inset;
padding-bottom:5px
;
@media (max-width:500px) {
    ${(props) => props.onlyWeb && "display: none"}
}
`;
const Tbody = styled.tbody``

export const Td = styled.td`
padding-top:15px;
text-align:${(props) => (props.alignCenter ? "center" : "start")};
width:${(props) => (props.width ? props.width : "auto")};

&.centered {
    text-align: center;
  }
`

const Grid = ({ produtos, setProduto, setOnEdit }) => {

    const handleEdit = (item) =>{
        setOnEdit(item)
    }

    const handleDelete = async(id)=>{
        await axios.delete(`http://34.204.93.4:8000/product/${id}`)
        .then(({data}) =>{
            const newArray = produtos.filter((produto) => produto.id !== id)

            setProduto(newArray)
            toast.success(data)
        })
        .catch(({data}) => toast.error(data));
        setOnEdit(null);
        
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Nome</Th>
                    <Th>Estoque</Th>
                </Tr>
            </Thead>
            <Tbody>
            {produtos.map((item, i) => {
        return (
            <Tr key={i}>
                <Td width={"30%"}>{item.id}</Td>
                <Td width={"30%"}>{item.name}</Td>
                <Td width={"30%"}>{item.stock}</Td>  
                <Td className="centered"><FaEdit onClick={() => handleEdit(item)}/></Td>
                <Td className="centered"><FaTrash onClick={() => handleDelete(item.id)}/></Td>
            </Tr>
        );
    })}
            </Tbody>
        </Table>
    )
}

export default Grid