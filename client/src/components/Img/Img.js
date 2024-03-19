import { useState } from 'react';
function Image({ src = '', alt = 'image', className = null, width = null, height = null, style = null }) {
    // const [imgSrc, setImgUrl] = useState(src);
    // console.log("imgSRC>>>",imgSrc)
    // useEffect(() => {
    //     // Kiểm tra nếu src thay đổi trước khi cập nhật state
    //     if (src !== imgSrc) {
    //         setImgUrl(src);
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [src]);
    // const handleOnError = () => {
    //     console.log("vo day khong")
    //     setImgUrl(https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg);
    // };
    const [error, setError] = useState(false);

    const handleOnError = () => {
        setError(true);
    };
    return (
        <img
            onError={() => handleOnError()}
            className={className}
            style={style}
            loading="lazy"
            width={width}
            height={height}
            src={
                error
                    ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
                    : src
            }
            alt={alt}
        ></img>
    );
}

export default Image;
