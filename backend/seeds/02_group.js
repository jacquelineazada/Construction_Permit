/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // Deletes ALL existing entries (reverse order for FKs)
  await knex("bldg_use_group").del();

  // Insert all groups in bldg_use_group
  await knex("bldg_use_group").insert([
    { bldg_use_grp: "GROUP A", bldg_use_grp_desc: "RESIDENTIAL (DWELLINGS)" },
    { bldg_use_grp: "GROUP B", bldg_use_grp_desc: "RESIDENTIAL" },
    {
      bldg_use_grp: "GROUP C",
      bldg_use_grp_desc: "EDUCATIONAL & RECREATIONAL",
    },
    { bldg_use_grp: "GROUP D", bldg_use_grp_desc: "INSTITUTIONAL" },
    { bldg_use_grp: "GROUP E", bldg_use_grp_desc: "COMMERCIAL" },
    { bldg_use_grp: "GROUP F", bldg_use_grp_desc: "LIGHT INDUSTRIAL" },
    { bldg_use_grp: "GROUP G", bldg_use_grp_desc: "MEDIUM INDUSTRIAL" },
    {
      bldg_use_grp: "GROUP H",
      bldg_use_grp_desc: "ASSEMBLY (OCCUPANT LOAD LESS THAN 1,000)",
    },
    {
      bldg_use_grp: "GROUP I",
      bldg_use_grp_desc: "ASSEMBLY (OCCUPANT LOAD 1,000 OR MORE)",
    },
    { bldg_use_grp: "GROUP J-1", bldg_use_grp_desc: "AGRICULTURAL" },
    { bldg_use_grp: "GROUP J-2", bldg_use_grp_desc: "ACCESSORIES" },
  ]);
}
