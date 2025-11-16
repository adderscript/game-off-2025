import kaplay from 'kaplay';

const k = kaplay({
    width: 480,
    height: 270,
    stretch: false,
    crisp: true,
    letterbox: true,
    background: "#000000",
});

export default k;