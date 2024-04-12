import express from 'express';
import langRouter from './routes/lang.route';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/app", langRouter);

// app.get('/', (req: Request, res: Response) => {
//     return res.json({
//         status: "dank u wel!"
//     });
// });



app.listen(PORT, () => console.log(`listening on port ${PORT}`));