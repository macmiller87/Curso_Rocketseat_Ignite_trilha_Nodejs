interface IUserRenponseDTO {
    email: string;
    name: string;
    id: string;
    avatar: string;
    driver_license: string;
    avatar_url(): string; // Função de retorno da (url).
}

export { IUserRenponseDTO };