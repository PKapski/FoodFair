import React from 'react';

const loggedInInfo = "loggedIn";

export const login = (response) => {
    console.log('login now');
    localStorage.setItem(loggedInInfo, JSON.stringify(response));
}

export const logout = () => {
    localStorage.removeItem(loggedInInfo);
}

export const getToken = () => {
    return localStorage.getItem(loggedInInfo) && JSON.parse(localStorage.getItem(loggedInInfo)).accessToken;
}

export const getSupplierId = () => {
    return localStorage.getItem(loggedInInfo) && JSON.parse(localStorage.getItem(loggedInInfo)).supplierId;
}

export const getSupplierName = () => {
    return localStorage.getItem(loggedInInfo) && JSON.parse(localStorage.getItem(loggedInInfo)).supplierName;
}

export const isLoggedIn = () => {
    return localStorage.getItem(loggedInInfo) != null;
}