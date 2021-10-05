SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `tb_tables` (
  `id_table` int(11) NOT NULL,
  `name_table` varchar(300) NOT NULL,
  `createdby_table` varchar(300) NOT NULL,
  `regday_table` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tb_users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(300) NOT NULL,
  `tba_user` varchar(30) NOT NULL,
  `password_user` text NOT NULL,
  `datereg_user` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `tb_tables`
  ADD PRIMARY KEY (`id_table`);

ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `name_user` (`name_user`);

ALTER TABLE `tb_tables`
  MODIFY `id_table` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `tb_users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;