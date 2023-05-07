FROM stilliard/pure-ftpd

RUN echo "yes" > /etc/pure-ftpd/conf/ChrootEveryone
RUN echo "yes" > /etc/pure-ftpd/conf/NoAnonymous
RUN echo "yes" > /etc/pure-ftpd/conf/UnixAuthentication

EXPOSE 21
EXPOSE 30000-30009

CMD /run.sh -c 30 -C 10 -l puredb:/etc/pure-ftpd/pureftpd.pdb -E -j -R -P $PUBLICHOST -p 30000:30009
