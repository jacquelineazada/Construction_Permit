/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // Deletes ALL existing entries (reverse order for FKs)
  await knex("barangay").del();
  await knex("town").del();
  await knex("province").del();

  const province_id = 1;
  const town_id = 1;

  await knex("province").insert([
    {
      province_id: 1,
      province_name: "Naga City",
      region: "V",
    },
  ]);

  await knex("town").insert([
    {
      town_id: town_id,
      town_name: "Naga City",
      zipcode: "4400",
      province_id: province_id,
    },
  ]);

  // Insert Barangays in Naga City
  await knex("barangay").insert([
    { town_id: town_id, barangay_name: "Abella" },
    { town_id: town_id, barangay_name: "Bagumbayan Norte" },
    { town_id: town_id, barangay_name: "Bagumbayan Sur" },
    { town_id: town_id, barangay_name: "Balatas" },
    { town_id: town_id, barangay_name: "Calauag" },
    { town_id: town_id, barangay_name: "Cararayan" },
    { town_id: town_id, barangay_name: "Carolina" },
    { town_id: town_id, barangay_name: "Concepcion Grande" },
    { town_id: town_id, barangay_name: "Concepcion Pequeña" },
    { town_id: town_id, barangay_name: "Dayangdang" },
    { town_id: town_id, barangay_name: "Del Rosario" },
    { town_id: town_id, barangay_name: "Dinaga" },
    { town_id: town_id, barangay_name: "Igualdad Interior" },
    { town_id: town_id, barangay_name: "Lerma" },
    { town_id: town_id, barangay_name: "Liboton" },
    { town_id: town_id, barangay_name: "Mabolo" },
    { town_id: town_id, barangay_name: "Pacol" },
    { town_id: town_id, barangay_name: "Panicuason" },
    { town_id: town_id, barangay_name: "Peñafrancia" },
    { town_id: town_id, barangay_name: "Sabang" },
    { town_id: town_id, barangay_name: "San Felipe" },
    { town_id: town_id, barangay_name: "San Francisco (Poblacion)" },
    { town_id: town_id, barangay_name: "San Isidro" },
    { town_id: town_id, barangay_name: "Santa Cruz" },
    { town_id: town_id, barangay_name: "Tabuco" },
    { town_id: town_id, barangay_name: "Tinago" },
    { town_id: town_id, barangay_name: "Triangulo" },
  ]);
}
