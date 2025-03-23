const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
    origin: ['https://hc-client.vercel.app', 'http://localhost:5173', 'https://handson-5ec84.web.app'],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());




// Verify Token Middleware
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: 'unauthorized access' });
        }
        req.user = decoded;
        next();
    });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tv3to.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        const db = client.db('HandsOn');
        const usersCollection = db.collection('users');
        const eventsFeedDataCollection = db.collection('eventFeedDatas');
        const eventAttendeeListsCollection = db.collection('attendeeLists');
        const commentsCollection = db.collection('comments');
        const teamsCollection = db.collection('team');
        const teamsMembersCollection = db.collection('teamMembers');


        // verify admin middleware
        // const verifyAdmin = async (req, res, next) => {
        //     console.log('hello');
        //     const user = req.user;
        //     const query = { email: user?.email };
        //     const result = await usersCollection.findOne(query);
        //     console.log(result?.role);
        //     if (!result || result?.role !== 'admin')
        //         return res.status(401).send({ message: 'unauthorized access!!' });

        //     next();
        // };

        // verify host middleware
        // const verifyHost = async (req, res, next) => {
        //     console.log('hello');
        //     const user = req.user;
        //     const query = { email: user?.email };
        //     const result = await usersCollection.findOne(query);
        //     console.log(result?.role);
        //     if (!result || result?.role !== 'host') {
        //         return res.status(401).send({ message: 'unauthorized access!!' });
        //     }

        //     next();
        // };

        // auth related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '365d',
            });
            res
                .cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                })
                .send({ success: true });
        });
        // Logout
        app.get('/logout', async (req, res) => {
            try {
                res
                    .clearCookie('token', {
                        maxAge: 0,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                    })
                    .send({ success: true });
            } catch (err) {
                res.status(500).send(err);
            }
        });





        // save a user data in db
        app.put('/usersData', async (req, res) => {
            const user = req.body;

            const query = { email: user?.email };
            // check if user already exists in db
            const isExist = await usersCollection.findOne(query);
            if (isExist) {
                return res.send(isExist);
            }

            // save user for the first time
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    ...user,
                    timestamp: Date.now(),
                },
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);
        });

        // get all usersData
        app.get('/usersData', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });


        // get single user data
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        // add basic data and modify
        app.patch('/basicUpdate/:email', async (req, res) => {
            const email = req.params.email;
            const updateData = req.body;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateData?.name,
                    phone: updateData?.phone,
                    location: updateData?.location,
                    bio: updateData?.bio,
                    image: updateData?.image,
                },
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);

        });

        // add and update skills
        app.patch('/skillUpdate/:email', async (req, res) => {
            const email = req.params.email;
            const updateData = req.body;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    causes: updateData?.causes,
                    skills: updateData?.skills,
                    volunterType: updateData?.volunterType,
                },
            };

            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);

        });

        // add and update skills
        app.patch('/preferanceUpdate/:email', async (req, res) => {
            const email = req.params.email;
            const updateData = req.body;
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    availability: updateData?.availability,
                    preferredLocation: updateData?.preferredLocation,
                    language: updateData?.language,
                },
            };

            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result);

        });


        // post all the events for the eventFeed
        app.post('/eventFeed', async (req, res) => {
            const eventFeedData = req.body;
            const result = await eventsFeedDataCollection.insertOne(eventFeedData);
            res.send(result);
        });

        // get all eventFeedData
        app.get('/eventFeed', async (req, res) => {
            const category = req.query.category;
            const search = req.query.search;
            let query = {
                title: { $regex: search, $options: 'i' }
            };
            let options = {};
            if (category) {
                query = { postType: category };
            }
            const result = await eventsFeedDataCollection.find(query).toArray();
            res.send(result);
        });


        // event attendeeList add
        app.patch('/eventAttendeeLists', async (req, res) => {
            const attendeeList = req.body;
            const query = { eventCode: attendeeList.eventCode };
            const isExists = await eventAttendeeListsCollection.findOne(query);
            if (isExists) {
                return res.send({ message: 'Exists', isExists });
            }
            const result = await eventAttendeeListsCollection.insertOne(attendeeList);
            res.send(result);
        });

        // get all attendeeLists
        app.get('/eventAttendeeLists', async (req, res) => {
            const result = await eventAttendeeListsCollection.find().toArray();
            res.send(result);
        });

        // get user event attendee list
        app.get('/eventAttendeeList/:email', async (req, res) => {
            const email = req.params.email;
            const query = { joinUser: email };
            const result = await eventAttendeeListsCollection.find(query).toArray();
            res.send(result);
        });


        // attendeList Delete
        app.delete('/attendeeList/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await eventAttendeeListsCollection.deleteOne(query);
            res.send(result);
        });


        // get all comments
        app.get('/comments', async (req, res) => {
            const result = await commentsCollection.find().toArray();
            res.send(result);
        });


        // get specified post comments
        app.get('/comments/:postCode', async (req, res) => {
            const postCode = req.params.postCode;
            const query = { postCode: postCode };
            const result = await commentsCollection.find(query).toArray();
            res.send(result);
        });

        // add comments
        app.post('/comments', async (req, res) => {
            const comments = req.body;
            const result = await commentsCollection.insertOne(comments);
            res.send(result);
        });


        // add team collection
        app.post('/team', async (req, res) => {
            const teamData = req.body;
            const query = { teamOwner: teamData?.teamOwner };
            const isExist = await teamsCollection.findOne(query);
            if (isExist) {
                return res.send({ message: "cant create new team" });
            }
            const result = await teamsCollection.insertOne(teamData);
            res.send(result);
        });


        // get all team data
        app.get('/allTeams', async (req, res) => {
            const result = await teamsCollection.find().toArray();
            res.send(result);
        });


        // post join team data
        app.post('/joinTeamMemberData', async (req, res) => {
            const joinedMemberData = req.body;
            const query = { teamCode: joinedMemberData?.teamCode };
            const isExist = await teamsMembersCollection.findOne(query);
            if (isExist) {
                return res.send({ message: 'Cant rejoin !' });
            }
            const result = await teamsMembersCollection.insertOne(joinedMemberData);
            res.send(result);
        });

        app.get('/allTeamMembers', async (req, res) => {
            const result = await teamsMembersCollection.find().toArray();
            res.send(result);
        });

        // my members
        app.get('/myTeamMembers/:email', async (req, res) => {
            const email = req.params.email;
            const query = { teamOwner: email };
            const result = await teamsMembersCollection.find(query).toArray();
            res.send(result);
        });


        // Send a ping to confirm a successful connection
        // await client.db('admin').command({ ping: 1 });
        // console.log(
        // 'Pinged your deployment. You successfully connected to MongoDB!'
        // );
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is Running For HandsOn');
});


app.listen(port, () => {
    console.log(`HandsOn is running on port ${port}`);
});


