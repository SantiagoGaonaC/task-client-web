import {CustomError} from "@/app/api/infrastructure/errors/customError";

export function handleResponseError(response: Response): never {
    switch (response.status) {
        case 401:
            throw new CustomError("Token o sesión inválida");
        case 403:
            throw new CustomError("No tienes permisos para realizar esta acción");
        case 404:
            throw new CustomError("Recurso no encontrado");
        case 409:
            throw new CustomError("Conflicto: el recurso ya existe");
        default:
            throw new CustomError(`Error inesperado: ${response.statusText}`);
    }
}
