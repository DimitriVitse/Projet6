/* Import des modules necessaires */
const express = require("express");
const userRoutes = require("./routes/user");


/* Initialisation de l'API */
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

/* Enregistrement des sauces */

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

/* Mise en place reponses headers */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

/* Securite en tete */
const helmet = require("helmet");

app.use(helmet());

/* RateLimit */
const rateLimit = require("express-rate-limit");

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message:
            "Vous avez effectué plus de 100 requêtes dans une limite de 15 minutes!",
        headers: true,
    })
);

/* Mise en place du routage */
app.use("/api/auth", userRoutes);

// router.get('/', auth, stuffCtrl.getAllStuff);
// router.post('/', auth, multer, stuffCtrl.createSauce);
// router.get('/:id', auth, stuffCtrl.getOneSauce);
// router.put('/:id', auth, stuffCtrl.modifySauce);
// router.delete('/:id', auth, stuffCtrl.deleteSauce);

module.exports = app;