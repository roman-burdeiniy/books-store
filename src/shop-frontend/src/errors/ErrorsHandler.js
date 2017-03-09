/**
 * Created by roman_b on 3/3/2017.
 */

export const handleServerError = (error) =>{
    if (error != null)
        console.log(error.message)
}

export const handleConnectionError = (error, requestedResource) =>{
    if (error != null)
        console.log(`${error.message}. Requested resource: ${requestedResource}`);
}