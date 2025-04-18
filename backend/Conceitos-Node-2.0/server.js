
import express from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())



//req - Requisição
//res - Resposta
app.get('/usuarios/', async (req, res) => {

    const users = await prisma.user.findMany()
    res.status(200).json(users)
})


app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar
            }
        });

        console.log(user);

        return res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: user
        });
    }
    catch (error) {
        // Verificar se é um erro de unicidade do Prisma
        if (error.code === 'P2002') {
            // Identificar qual campo causou o problema de unicidade
            const field = error.meta?.target[0];

            if (field === 'username') {
                return res.status(400).json({ message: "Este nome de usuário já está em uso." });
            } else if (field === 'email') {
                return res.status(400).json({ message: "Este email já está cadastrado." });
            } else {
                return res.status(400).json({ message: `O campo ${field} deve ser único.` });
            }
        }

        // Para outros tipos de erros
        return res.status(400).json({ message: error.message });
    } finally {
        await prisma.$disconnect()
    }
})


app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                avatar: req.body.avatar
            }
        });


        return res.status(200).json({
            message: 'Usuário atualizado com sucesso',
            user
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(400).json({ message: 'Erro ao atualizar usuário' });
    } finally {
        await prisma.$disconnect();
    }
});


app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({
        message: 'Usuário deletado com sucesso'
    })
})

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuário no banco de dados pelo username
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        // Verificar se o usuário existe e a senha está correta
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // Autenticação bem-sucedida
        res.status(200).json({
            message: 'Login bem-sucedido',
            user: {
                avatar: user.avatar,
                id: user.id,
                name: user.name,
                username: user.username

            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao processar login' });
    } finally {
        await prisma.$disconnect();
    }
});

app.patch('/usuarios/atribuir-avatar-padrao', async (req, res) => {
    try {
        const usersWithoutAvatar = await prisma.user.findMany({
            where: { avatar: null } // Encontra usuários sem avatar
        });

        const updates = usersWithoutAvatar.map(user => {
            return prisma.user.update({
                where: { id: user.id },
                data: { avatar: 'https://your-default-avatar-url.png' }
            });
        });

        await Promise.all(updates);

        res.status(200).json({ message: 'Avatares padrão atribuídos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atribuir avatares padrão.' });
    }
});


app.listen(3000)
//http://localhost:3000


/*
MONGO DB
zanotticelulares89 -  VrmevXD3Z6SkBfyI
*/