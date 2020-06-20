

# docker
+ 在 Dockerfile 的规则中，如果目标路径最后跟 “/“ 符号，那么就代表目录，否则就是文件。如果目标目录不存在，那么会新建这个目录
+ COPY
    - 使用`COPY`时，源路径如果是目录，那么只复制其内部的文件而不包含自身，另外文件自身的文件系统元数据也将复制过去，比如说文件权限等。
+ ADD 
    - 指令除了 COPY 指令的简单复制功能外，还支持从网络地址上下载。
    - 源路径是打包压缩文件, 会在docker内自动解压文件。但是是源路径是地址（下载的方式）时不会解压
+ WORKDIR 
    - 指令设置Dockerfile中的任何RUN，CMD，ENTRPOINT，COPY和ADD指令的工作目录。
    - 如果WORKDIR指 定的目录不存在，即使随后的指令没有用到这个目录，都会创建。
    - 单个Dockerfile可以使用多次WORKFDIR。如果提供一个相对路径，当前的工作目录将于上个WORKDIR指令相关。






# 参考资料
+ [Dockerfile-COPY-和-ADD-指令区别和使用规则](https://islishude.github.io/blog/2019/06/29/docker/Dockerfile-COPY-%E5%92%8C-ADD-%E6%8C%87%E4%BB%A4%E5%8C%BA%E5%88%AB%E5%92%8C%E4%BD%BF%E7%94%A8%E8%A7%84%E5%88%99/)
