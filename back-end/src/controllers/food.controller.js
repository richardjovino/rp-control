const { PrismaClient } = require('@prisma/client');

exports.create = async(req,res) =>{
    const prisma = new PrismaClient();
    const { name, stock } = req.body;


    try{
        const foodExists = await prisma.food.findUnique({
          where: {
            name,
          },
        });
        if(foodExists){
res.status(403).json({error: 'Produto já existe'})
}else{     
        const newFood = await prisma.food.create({
            data: {
                name,
                stock,
              },
        })
      res.status(200).json({message: 'Produto criado com sucesso'})
   } }catch(err){
        res.status(500).json({error: 'Erro ao criar produto'})
        throw(err)
    }
}

exports.find = async(req,res) =>{
    const prisma = new PrismaClient();

    try {
        const foodExists = await prisma.food.findUnique({
            where: { id: Number(req.params.id) },
            select: {
                id:true,
              name:true,
              stock:true
            },
          });
    
        if (!foodExists) {
          return res.status(401).json({ error: 'Produto não encontrado' });
        }else{
            res.status(200).json(foodExists);
        }
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar produto' });
      }
}

exports.index = async(req,res) =>{
    const prisma = new PrismaClient();
    try {
        const foodFind = await prisma.food.findMany(
            {
                orderBy: { id: 'asc' },
                select: {
                    id:true,
                    name:true,
                    stock: true
                }
            }
        );
        res.status(200).json(foodFind);
    } catch (e) {
        res.status(400).json('[Error] - Não foi possível concluir a requisição')
    }
    // recupera todos os produto        
}

exports.update = async(req,res) =>{
        const prisma = new PrismaClient();
        try {
            console.log(req.body);
            console.log(req.params.id);
            const foodUpdated = await prisma.food.update(
                {
                    where: { id: Number(req.params.id) },
                    data: req.body,
                    select: {
                        id: true,
                        name: true,
                        stock:true
                    }

                }
            );
            res.status(200).json(foodUpdated);
        } catch (e) {
            console.log(e);
            res.status(400).json('[Error] - Não foi possível concluir a requisição')
        }
}
exports.delete= async(req, res) => {
    const prisma = new PrismaClient();
    try {
        await prisma.food.delete(
            {
                where: { id: Number(req.params.id) }
            }
        );
        res.status(200).json({ excluido: true });

    } catch (e) {
        res.status(400).json('[Error] - Não foi possível concluir a requisição')
    }
}
