export type User = {
    handle: string;
    name: string;
    email: string;
    _id: string;
    description: string; 
    image: string;
    links: string
}

export type userHandle = Pick<User, 'handle' | 'name' | 'description' | 'image' | 'links'>


export type RegisterForm = Pick<User, "handle" | "email" | "name" > & {
    password: string;
    passwordConfirm: string;
}

export type LoginForm = Pick<User, "email"> & {
    password: string;
}


export type ProfileForm = Pick<User, "handle" | "description"> 


export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type MiProfileLink = Pick<SocialNetwork, "name" | "url" | 'enabled' > & {
    id: number
}