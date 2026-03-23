// Función de lógica de negocio (desacoplada de la UI)
const validarPassword = (pass: string) => pass.length >= 6;

describe('Pruebas Unitarias: Lógica de Negocio', () => {

  test('Debe aprobar si la contraseña tiene 6 o más caracteres', () => {
    expect(validarPassword('123456')).toBe(true);
  });

  test('Debe fallar si la contraseña es muy corta', () => {
    expect(validarPassword('123')).toBe(false);
  });

});