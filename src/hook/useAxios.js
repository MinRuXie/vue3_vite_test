

// export values from async function
// https://stackoverflow.com/questions/73768828/export-values-from-async-function

// 不會寫TT

// Get
export async function useAaxiosGet(url) {
    const resData = ref(null)
    const resError = ref(null)

    axios({
        method: 'get',
        url: `https://dummyjson.com/users?limit=${itemCount.value}&skip=0`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;
        
        usersData.value = data.users;
        usersLoadingStatus.value = false;
    })
    .catch(function (error) {
        console.log('取得失敗', error);

    });


    return { resData, resError }
}

// this does what you attempted to do
// but actually works
// let fun = async () => {
//     let a = await new Promise(r => setTimeout(r, 100, 10));
//     return a;
// };

// let a = await fun();
// export default a;


// Post
export async function useAxiosPost(url, reqData) {
    const resData = ref(null)
    const resError = ref(null)


    return { resData, resError }
}

// Del
export async function useAxiosDel(url) {
    const resData = ref(null)
    const resError = ref(null)


    return { resData, resError }
}

// put(替換資源)、patch(更換資源部分內容)
export async function useAxiosUpdate(url, reqData) {
    const resData = ref(null)
    const resError = ref(null)


    return { resData, resError }
}