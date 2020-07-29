export default async function validateCode(res) {
	if (!res.ok) {
		if (res.headers.get('content-type').indexOf('application/json') !== -1) {
			throw { ...(await res.json()), status: res.status };
		} else {
			throw { response: await res.text(), status: res.status };
		}
	} else {
		return res;
	}
}