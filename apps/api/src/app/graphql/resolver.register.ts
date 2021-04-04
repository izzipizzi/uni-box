import authResolver from "./unauthorized/auth/auth.resolver";
import materialResolver from "./authorized/material/material.resolver";
import boxResolver from "./authorized/box/box.resolver";
import userResolver from "./authorized/user/user.resolver";

export const RESOLVERS = {
    authorized: [
        materialResolver,
        boxResolver,
        userResolver,

    ],
    unauthorized: [
        authResolver,

    ]
};