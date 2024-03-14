const cardListParamList = {
    desktop:{
        width: 1280,
        initialLength: 16,
        extraLength: 4
    },
    tablet:{
        width: 720,
        initialLength: 8,
        extraLength: 2
    },
    mobile:{
        width: 480,
        initialLength: 5,
        extraLength: 2
    },  
}

const pleaseWaitErrMessage ='Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'

export {cardListParamList, pleaseWaitErrMessage};