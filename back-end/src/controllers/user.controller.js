const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client');

exports.create = async(req,res) =>{
    const prisma = new PrismaClient();
    const { usuario, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const usuarioExistente = await prisma.user.findUnique({
          where: {
            usuario,
          },
        });
        if(usuarioExistente){
res.status(403).json({error: 'Usuario já existe'})
}else{     
        const newUser = await prisma.user.create({
            data: {
                usuario,
                password: hashedPassword,
              },
        })
      res.status(200).json({message: 'Usuario criado com sucesso'})
   } }catch(err){
        res.status(500).json({error: 'Erro ao criar usuário'})
        throw(err)
    }
}

exports.find = async(req,res) =>{
    const prisma = new PrismaClient();
    const { usuario, password } = req.body;
    try {
        const usuarioExistente = await prisma.user.findUnique({
          where: {
            usuario,
          },
        });
    
        if (!usuarioExistente) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
        }
    
        // Comparação da senha hasheada
        const senhaCorreta = await bcrypt.compare(password, usuarioExistente.password);
    
        if (!senhaCorreta) {
          return res.status(401).json({ error: 'Senha incorreta' });
        }
    
        // Geração do token JWT
        const token = jwt.sign({ usuario: usuarioExistente.usuario, userId: usuarioExistente.id }, process.env.JWT_TOKEN, {
          expiresIn: '1h',
        });
    
        res.json({ token });
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
      }
}

