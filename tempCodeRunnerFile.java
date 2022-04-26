import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

class fragment {
    private String Ipad;
    private String fragId;
    private String fragoff;
    private String mf;
    private String paylength;
    private int flag;

    public fragment(String ipad, String fragId, String fragoff, String mf, String paylength, int flag) {
        Ipad = ipad;
        this.fragId = fragId;
        this.fragoff = fragoff;
        this.mf = mf;
        this.paylength = paylength;
        this.flag = flag;
    }

    public String getIpad() {
        return Ipad;
    }

    public void setIpad(String ipad) {
        Ipad = ipad;
    }

    public String getFragId() {
        return fragId;
    }

    public void setFragId(String fragId) {
        this.fragId = fragId;
    }

    public String getFragoff() {
        return fragoff;
    }

    public void setFragoff(String fragoff) {
        this.fragoff = fragoff;
    }

    public String getMf() {
        return mf;
    }

    public void setMf(String mf) {
        this.mf = mf;
    }

    public String getPaylength() {
        return paylength;
    }

    public void setPaylength(String paylength) {
        this.paylength = paylength;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }
}


public class assignment {

    public static List<fragment> arr = new ArrayList<>();

    public static void main(String[] args) {
        List<String> data = new ArrayList<>();
        try {
            data = Files.readAllLines(Paths.get(args[0]));
        } catch (Exception e) {
            e.getLocalizedMessage();
        }

        for (String str : data) {
            String temp[] = str.split(" ");

            if (arr.size() == 0) {
                arr.add(new fragment(temp[0], temp[1], temp[2], temp[3], temp[4], 0));
            }

            else {
                int fl = 0;
                for (fragment frag : arr) {
                    if (frag.getFragId().equals(temp[1]) && frag.getIpad().equals(temp[0])){
                        if (frag.getMf().equals("1")) {
                            int payload = Integer.parseInt(frag.getPaylength());
                            int fragoff = Integer.parseInt(temp[2]);
                            if (frag.getIpad().equals(temp[0]) && frag.getFragId().equals(temp[1])
                                    && frag.getFragoff().equals(temp[2]) && frag.getMf().equals(temp[3])
                                    && frag.getPaylength().equals(temp[4])) {
                                frag.setFlag(2);
                                fl = 1;
                            }

                            else if (payload / 8 == fragoff) {
                                frag.setFlag(1);
                                frag.setPaylength(String.valueOf(payload + Integer.parseInt(temp[4])));
                                frag.setMf(temp[3]);
                                fl = 1;
                            }

                            else if (payload / 8 != fragoff) {
                                frag.setFlag(3);
                                frag.setMf("0");
                                fl = 1;
                            }
                        } else if (frag.getMf().equals("0")) {
                            if (frag.getIpad().equals(temp[0]) && frag.getFragId().equals(temp[1])
                                    && frag.getFragoff().equals(temp[2]) && frag.getMf().equals(temp[3])
                                    && frag.getPaylength().equals(temp[4])) {
                                frag.setFlag(2);
                                fl = 1;
                            }
                        }
                    }
                }
                if (fl == 0) {
                    arr.add(new fragment(temp[0], temp[1], temp[2], temp[3], temp[4], 0));
                }
            }
        }
        System.out.println("\n    IP Address     Frag ID   Message/Payload Length \n");
        for (fragment frag : arr) {
            if (frag.getFlag() == 2) {
                System.out.printf("%15s %8s    Duplicate Fragment\n", frag.getIpad(), frag.getFragId());
            } else if (frag.getMf().equals("1")) {
                System.out.printf("%15s %8s    Missing Fragment\n", frag.getIpad(), frag.getFragId());
            } else if (frag.getFlag() == 0 || frag.getFlag() == 1) {
                System.out.printf("%15s %8s %7s\n", frag.getIpad(), frag.getFragId(), frag.getPaylength());
            } else if (frag.getFlag() == 3) {
                System.out.printf("%15s %8s    Mismatch in length\n", frag.getIpad(), frag.getFragId());
            }
        }
        System.out.println("\n");
    }
}