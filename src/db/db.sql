CREATE table users(
    user_id uuid Primary Key,
    user_name varchar(50) not null,
    user_img text not null,
    user_phone text not null unique,
    user_email text not null unique,
    user_pol boolean default true,
    user_password varchar(13) not null
);                                              ✅

CREATE TABLE category(
    cat_id uuid Primary Key,
    cat_title varchar(100) not null
);                                              ✅

CREATE TABLE subCategory(
    sub_id uuid  Primary Key,
    sub_title varchar(100),
    sub_cat uuid,
    foreign key(sub_cat)
    references category(cat_id) 
);

CREATE TABLE product(
    pro_id uuid Primary Key,
    pro_name varchar(50) not null,
    pro_price number not null,
    pro_img text not null,
    pro_img2 text not null,
    pro_razmer text,
    pro_pol boolean,
    pro_after text,
    pro_in text,
    pro_langu text,
    pro_sub uuid,
    foreign key(pro_sub)
    references subCategory(sub_id)
);

CREATE TABLE likes(
    like_id uuid,
    like_pro uuid,
    foreign key(like_pro)
    references product(pro_id),
    like_user uuid,
    foreign key(like_user) 
    references users(user_id)
);

CREATE TABLE karzinka(
    karzinka_id uuid,
    karzinka_pro uuid,
    foreign key(karzinka_pro)
    references product(pro_id),
    karzinka_user uuid,
    foreign key(karzinka_user) 
    references users(user_id)
);