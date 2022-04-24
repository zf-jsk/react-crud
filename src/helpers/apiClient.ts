
const baseUrl = "http://localhost:5000/customers";

const doAction = async (options: any = {}) => {
    const defaultMethod = "GET"
    const defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    const controller = new AbortController()
    options.signal = controller.signal

    options.method = options.method || defaultMethod
    options.headers = options.headers
        ? { ...defaultHeaders, ...options.headers }
        : defaultHeaders

    options.body = JSON.stringify(options.body) || false
    if (!options.body) delete options.body

    setTimeout(() => {
        controller.abort()
    }, 3000)

    try {
        let url = baseUrl;
        if (options.id) {
            url += options.id ? '/' + options.id : '';
        }
        const response = await fetch(url, options)
        return await response.json();
    } catch (err) {
        return err;
    }
}

export const apiClient = {
    doAction: doAction
}
