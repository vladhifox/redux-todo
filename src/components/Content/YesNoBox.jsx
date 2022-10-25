const YesNoBox = () => {
    return ( <div className="yes-no-box">
                <div className="yes-no-box__container">
                    <div className="yes-no-box__body">Видалити задачу?</div>
                    <div className="yes-no-box__buttons">
                        <div className="yes-no-box__yes yes-no-box__yes_show">ТАК</div>
                        <div className="yes-no-box__no">НІ</div>
                    </div>
                </div>
            </div> );
}
 
export default YesNoBox;