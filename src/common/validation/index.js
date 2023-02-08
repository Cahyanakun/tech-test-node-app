const password = (value, helpers) => {
  if (
    value.length < 8 ||
    !value.match(/\d/) ||
    !value.match(/[a-zA-Z]/) ||
    !value.match(/[-!@$%^&*()_+|~=`{}[\]:";'<>?,./]/)
  ) {
    return helpers.message(
      'Kata sandi harus berisi minimal 8 karakter, dan setidaknya berisi 1 huruf, 1 angka, dan 1 simbol.'
    );
  }
  return value;
};

const email = (value, helpers) => {
  if (!value) {
    return helpers.message('Email atau nomor handphone harus diisi.');
  }
  if (!Number(value)) {
    if (!value.match(/[@]/)) {
      return helpers.message('Email atau nomor handphone tidak valid.');
    }
  } else if (![11, 12, 13].includes(value.length)) {
    return helpers.message('Email atau nomor handphone tidak valid.');
  }
  return value;
};

module.exports = {
  password,
  email,
};
