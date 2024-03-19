function Star({
    onInHandleStar,
    setStar,
    onInHandleMoveStar,
    iconFaceAngry,
    iconFaceSmile,
    iconSmileWink,
    iconFaceGrinHearts,
    iconStar,
    iconFaceKissWinkHeart,
    star,
    cx,
    Tippy
}) {
    return (
        <>
            <Tippy animation="scale" content={iconFaceAngry}>
                <div
                    onClick={() => onInHandleStar(1)}
                    onMouseMove={() => setStar(1)}
                    onMouseLeave={() => onInHandleMoveStar()}
                    // id="1"
                    className={cx({
                        'active-star': 1 <= star,
                    })}
                >
                    {iconStar}
                </div>
            </Tippy>

            <Tippy animation="scale" content={iconFaceSmile}>
                <div
                    onClick={() => onInHandleStar(2)}
                    onMouseMove={() => setStar(2)}
                    onMouseLeave={() => onInHandleMoveStar()}
                    className={cx({
                        'active-star': 2 <= star,
                    })}
                >
                    {iconStar}
                </div>
            </Tippy>

            <Tippy animation="scale" content={iconSmileWink}>
                <div
                    onClick={() => onInHandleStar(3)}
                    onMouseMove={() => setStar(3)}
                    onMouseLeave={() => onInHandleMoveStar()}
                    // id="3"
                    className={cx({
                        'active-star': 3 <= star,
                    })}
                >
                    {iconStar}
                </div>
            </Tippy>
            <Tippy animation="scale" content={iconFaceGrinHearts}>
                <div
                    onClick={() => onInHandleStar(4)}
                    onMouseMove={() => setStar(4)}
                    onMouseLeave={() => onInHandleMoveStar()}
                    // id="4"
                    className={cx({
                        'active-star': 4 <= star,
                    })}
                >
                    {iconStar}
                </div>
            </Tippy>
            <Tippy animation="scale" content={iconFaceKissWinkHeart}>
                <div
                    onClick={() => onInHandleStar(5)}
                    onMouseMove={() => setStar(5)}
                    onMouseLeave={() => onInHandleMoveStar()}
                    // id="5"
                    className={cx({
                        'active-star': 5 <= star,
                    })}
                >
                    {iconStar}
                </div>
            </Tippy>
        </>
    );
}

export default  Star;
