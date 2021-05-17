import './styles.scss'

const fakeJson = ["jonas", "jonas", "jonas"];

fakeJson.forEach((el) => {
    const t = document.createElement("png");
    t.src = el + ".jpg";
    document.body.appendChild(t);
});
