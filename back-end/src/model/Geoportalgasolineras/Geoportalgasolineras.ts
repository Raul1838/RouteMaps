export interface GeoportalgasolinerasResponse {
    Fecha:             string;
    ListaEESSPrecio:   ListaEESSPrecio[];
    Nota:              string;
    ResultadoConsulta: string;
}

export interface ListaEESSPrecio {
    "C.P.":                               string;
    Dirección:                            string;
    Horario:                              string;
    Latitud:                              string;
    Localidad:                            string;
    "Longitud (WGS84)":                   string;
    Margen:                               string;
    Municipio:                            string;
    "Precio Biodiesel":                   number;
    "Precio Bioetanol":                   number;
    "Precio Gas Natural Comprimido":      number;
    "Precio Gas Natural Licuado":         number;
    "Precio Gases licuados del petróleo": number;
    "Precio Gasoleo A":                   number;
    "Precio Gasoleo B":                   number;
    "Precio Gasoleo Premium":             number;
    "Precio Gasolina 95 E10":             number;
    "Precio Gasolina 95 E5":              number;
    "Precio Gasolina 95 E5 Premium":      number;
    "Precio Gasolina 98 E10":             number;
    "Precio Gasolina 98 E5":              number;
    "Precio Hidrogeno":                   number;
    Provincia:                            string;
    Remisión:                             string;
    Rótulo:                               string;
    "Tipo Venta":                         string;
    "% BioEtanol":                        string;
    "% Éster metílico":                   string;
    IDEESS:                               string;
    IDMunicipio:                          string;
    IDProvincia:                          string;
    IDCCAA:                               string;
}