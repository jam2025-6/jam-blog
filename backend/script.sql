create table articles
(
    id         int unsigned auto_increment comment '文章ID'
        primary key,
    title      varchar(200)                       not null comment '文章标题',
    date       datetime                           not null comment '文章日期',
    content    text                               not null comment '文章内容',
    created_at datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间'
)
    comment '文章表' collate = utf8mb4_unicode_ci;

create index idx_articles_date
    on articles (date);

create table memories
(
    id           int unsigned auto_increment comment '回忆ID'
        primary key,
    title        varchar(200)                       not null comment '回忆标题',
    description  varchar(500)                       not null comment '回忆描述',
    content      text                               not null comment '回忆内容',
    date         datetime                           not null comment '回忆日期',
    location     varchar(100)                       not null comment '回忆地点',
    emotion      varchar(50)                        not null comment '回忆情绪',
    emotion_icon varchar(10)                        not null comment '回忆情绪图标',
    created_at   datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updated_at   datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间'
)
    comment '回忆表' collate = utf8mb4_unicode_ci;

create index idx_memories_date
    on memories (date);

create index idx_memories_emotion
    on memories (emotion);

create index idx_memories_location
    on memories (location);

create table memory_images
(
    id          int unsigned auto_increment comment '图片ID'
        primary key,
    memory_id   int unsigned                       not null comment '关联的回忆ID',
    url         varchar(255)                       not null comment '图片URL',
    image_order int      default 0                 not null comment '图片排序',
    created_at  datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updated_at  datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    constraint fk_memory_images_memory_id
        foreign key (memory_id) references memories (id)
            on update cascade on delete cascade
)
    comment '回忆图片表' collate = utf8mb4_unicode_ci;

create index idx_memory_images_memory_id
    on memory_images (memory_id);

create table messages
(
    id         int unsigned auto_increment comment '留言ID'
        primary key,
    name       varchar(100)                                                       not null comment '留言者姓名',
    email      varchar(100)                                                       null comment '留言者邮箱',
    content    text                                                               not null comment '留言内容',
    ip         varchar(45)                                                        not null comment '留言者IP地址',
    user_agent text                                                               not null comment '留言者浏览器信息',
    status     enum ('pending', 'approved', 'rejected') default 'pending'         not null comment '留言状态',
    created_at datetime                                 default CURRENT_TIMESTAMP not null comment '创建时间',
    updated_at datetime                                 default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间'
)
    comment '留言表' collate = utf8mb4_unicode_ci;

create index idx_messages_created_at
    on messages (created_at);

create index idx_messages_email
    on messages (email);

create index idx_messages_status
    on messages (status);

create table self_talkings
(
    id         int unsigned auto_increment comment '自言自语ID'
        primary key,
    time       datetime                           not null comment '记录时间',
    content    varchar(1000)                      not null comment '内容',
    created_at datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间'
)
    comment '自言自语表' collate = utf8mb4_unicode_ci;

create index idx_self_talkings_time
    on self_talkings (time);


