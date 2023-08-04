export const actions = {
  default: async ({ request }) => {
    let data = await request.formData();
    let company = data.get('company');
    let description = data.get('description');
    let amount = data.get('amount');
    let hst = data.get('hst');
    let tip = data.get('tip');
    let category = data.get('category');
    return { success: true };
  }
};